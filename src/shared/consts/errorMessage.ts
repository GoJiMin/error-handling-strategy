type ServerErrorCode = Record<string, string>;
export type ClientErrorCode = keyof typeof CLIENT_ERROR_MESSAGE;

export const SERVER_ERROR_MESSAGE: ServerErrorCode = {
  INTERNAL_SERVER_ERROR: '서버에서 알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.',

  TODO_NOT_FOUND: '해당 투두를 찾을 수 없어요. 투두가 삭제되었거나 존재하지 않을 수 있어요.',
  CAN_NOT_SAVE_TODO: '투두 저장에 실패했어요. 다시 시도해주세요.',
} as const;

export const CLIENT_ERROR_MESSAGE = {
  INPUT_TOO_LONG: '투두는 최대 20글자까지 입력할 수 있어요.',
  INPUT_TOO_SHORT: '투두를 최소 3글자 이상 입력해주세요.',
} as const;
