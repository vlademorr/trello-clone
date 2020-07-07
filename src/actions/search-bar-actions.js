export function handleChangeAction(e) {
  return {
    type: "SEARCH_INPUT_VALUE",
    payload: e.target.value,
  };
}
