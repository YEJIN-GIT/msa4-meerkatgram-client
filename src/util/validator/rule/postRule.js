/**
 * 사용자아이디 유효성 체크
 * @param {string} val 검증할 문자열
 * @returns {string} 통과시 빈문자열(''),  실패시 에러메세지
 */
export const userId = (val) => {
  if(!val) {
    return '사용자 아이디는 필수입니다.';
  }
  
  return '';
}

/**
 * 내용 유효성 체크
 * @param {string} val 검증할 문자열
 * @returns {string} 통과시 빈문자열(''),  실패시 에러메세지
 */
export const content = (val) => {
  if(!val) {
    return '내용은 필수입니다.';
  }

  if(val.trim().length > 200) {
    return '내용을 200자 이내로 입력해주세요.';
  }

  return '';
}

/**
 * 이미지 유효성 체크
 * @param {string} val 검증할 문자열
 * @returns {string} 통과시 빈문자열(''),  실패시 에러메세지
 */
export const image = (val) => {
  if(!val) {
    return '이미지는 필수입니다.';
  }

  return '';
}
