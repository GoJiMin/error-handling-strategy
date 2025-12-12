## 프로젝트 소개

이 프로젝트는 이전에 진행한 [리뷰 커뮤니티 서비스](https://github.com/GoJiMin/modu-client)에 적용한 에러 처리 전략을 소개하기 위한 데모 프로젝트입니다.

실제 서비스 코드에서 에러 처리와 관련된 부분만 분리해 API 요청부터 에러 생성, 에러 구독, UI 처리까지의 흐름을 최소한의 예제로 구현했습니다.

## 왜 에러 중앙화인가

프로젝트를 진행하며 가장 불편했던 점은 API마다 반복되던 try/catch와 화면마다 달랐던 에러 처리 방식이었습니다.

기능이 늘어나면서 API 요청 수가 빠르게 증가했고, 화면마다 에러 메시지와 처리 방식이 제각각이 되다 보니 유지보수와 확장성 모두 한계가 보이기 시작했습니다.

## 전체적인 에러 처리 흐름

이 프로젝트의 에러 흐름은 아래 단계로 구성됩니다.

1. 모든 API 요청은 `/src/shared/apis/request.ts`에 작성된 request 함수로만 실행됩니다.
2. 요청 성격(읽기/쓰기)에 따라 서로 다른 커스텀 에러(RequestGetError/RequestError)를 생성합니다.
3. 리액트 쿼리의 QueryCache/MutationCache에서 에러를 가로채 전역 스토어에 저장합니다.
4. 전역 에러 구독자가 에러 유형에 따라 토스트를 표시하며, 읽기 요청의 경우 에러 바운더리로 UI를 처리합니다.
   - 클라이언트 사이드에서 발생하는 에러 또한 전역 에러 구독자가 처리합니다.
5. 예측 불가능한 에러는 최상위 에러 바운더리가 처리합니다.

### 1. API 요청 단일화(request)

모든 API 요청은 request 함수를 래핑한 requestGet, requestPost를 통해 실행됩니다.
```ts
requestGet(...) // 읽기 요청
requestPost(...) // 쓰기 요청
```
요청이 실패하면 요청 성격에 따라 분기해 커스텀 에러를 throw합니다.
- GET => RequestGetError
- POST => RequestError
분리 이유는 읽기 요청과 쓰기 요청은 사용자가 기대하는 UI가 다르기 때문입니다.

### 2. 커스텀 에러 설계 의도

#### RequestGetError

읽기 요청에서 에러 발생 시 화면 자체를 구성하지 못하는 경우가 많습니다. 따라서 에러 바운더리를 사용한 대체 UI를 표시하며 재시도 버튼을 통해 사용자에게 데이터 재요청을 유도합니다.

필요 시 `errorHandlingType: 'toast'`로 토스트 처리도 가능합니다.

#### RequestError

사용자 입력이나 액션 실패로 작업 중인 화면을 유지하기 위해 토스트를 사용해 피드백합니다.

이런 구조로 API 호출 시점에 이 에러를 어떻게 보여줄지를 명확히 표시할 수 있습니다.

### 3. 리액트 쿼리를 이용한 에러 구독

모든 읽기/쓰기 요청은 리액트 쿼리를 통합니다. QueryCache와 MutationCache의 onError 콜백을 사용해 에러를 가로챕니다.

```ts
throwOnError: (error: Error) => error instanceof RequestGetError && error.errorHandlingType === 'errorBoundary',

queryCache: new QueryCache({
  onError(error) {
    if (error instanceof RequestGetError && error.errorHandlingType === 'errorBoundary') return;
    if (error instanceof RequestError) setGlobalError(error);
  },
}),
mutationCache: new MutationCache({
  onError(error) {
    if (error instanceof RequestError) setGlobalError(error);
  },
}),
```

GET 요청 + 에러 바운더리 처리의 경우 throwOnError를 true로 설정해 상위로 전파하며, 그 외 에러는 모두 전역 스토어로 전달합니다.

### 4. 전역 에러 구독 및 UI 처리

전역 스토어에 모인 에러는 GlobalErrorSubscriber에서 구독해 UI로 표시합니다.
- 예측 가능한 서버 에러(서버와 합의된 에러 코드를 가진 에러) => 토스트
- 클라이언트 에러 => 토스트
- 예측 불가능한 에러 => 에러 바운더리 전파

```ts
if (isClientError(globalError)) {
  toast.error({
    title: '알림',
    description: globalError.message,
  });

  resetGlobalError();
  return;
}

if (isPredictableServerError(globalError)) {
  toast.error({
    title: '에러가 발생했어요.',
    description: SERVER_ERROR_MESSAGE[globalError.name],
  });

  resetGlobalError();
  return;
}

showBoundary(globalError);
```
throw 대신 showBoundary를 사용하는 이유는 useEffect가 렌더링 이후 실행되기 때문입니다.

### 5. 전역 에러 바운더리

모든 예외를 통과한 에러는 가장 상위에 위치한 GlobalErrorBoundary에서 처리됩니다.

```ts
<GlobalErrorBoundary>
  <GlobalErrorSubscriber>
    <ReactQueryProvider>
      {children}
      <Toaster position="top-center" />
    </ReactQueryProvider>
  </GlobalErrorSubscriber>
</GlobalErrorBoundary>
```

## 주요 로직

에러 처리 흐름을 구성하는 주요 로직은 아래 위치에 모여있습니다.

- API 요청 함수 (request) - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/shared/apis/api-service.ts)
  - `/src/shared/apis/api-service.ts`
 
- 커스텀 에러 정의 - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/shared/apis/request-error.ts)
  - `/src/shared/apis/request-error.ts`

- 에러 분류 및 유틸 함수 - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/shared/lib/error-utils.ts)
  - `/src/shared/lib/error-utils.ts`

- 리액트 쿼리 설정 및 전역 콜백 - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/app/providers/ReactQueryProvider.tsx)
  - `/src/app/providers/ReactQueryProvider.tsx`

- 전역 에러 상태 관리 (Zustand) - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/entities/error/model/globalErrorStore.ts)
  - `/src/entities/error/model/globalErrorStore.ts`

- 전역 에러 구독 및 UI 처리 - [바로가기](https://github.com/GoJiMin/error-handling-strategy/blob/main/src/app/providers/GlobalErrorSubscriber.tsx)
  - `/src/app/providers/GlobalErrorSubscriber.tsx`
 
그 외 코드는 에러 처리 시연을 위한 단순 UI 코드입니다.

## 실행 방법

```bash
pnpm install
pnpm dev

npm install
npm run dev

yarn install
yarn dev
```

- `/` : GET 요청 실패 => 대체 UI 표시
- `/write-error` :
  - 3글자 미만 입력 시 클라이언트 검증 에러 => 토스트 표시
  - 20글자 초과 입력 시 클라이언트 검증 에러 => 토스트 표시
  - POST 요청 실패 => 토스트 표시

 
