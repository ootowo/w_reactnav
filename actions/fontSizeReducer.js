import { _DEFAULT_FONT_SIZE } from "../utils/config";
export const CHANGE_TO_SMALL = "CHANGE_TO_SMALL";
export const changeToSmall = () => ({
  type: CHANGE_TO_SMALL,
  size: _DEFAULT_FONT_SIZE.small
});

export const CHANGE_TO_MEDIUM = "CHANGE_TO_MEDIUM";
export const changeToMedium = () => ({
  type: CHANGE_TO_MEDIUM,
  size: _DEFAULT_FONT_SIZE.medium
});

export const CHANGE_TO_LARGE = "CHANGE_TO_LARGE";
export const changeToLarge = () => ({
  type: CHANGE_TO_LARGE,
  size: _DEFAULT_FONT_SIZE.large
});
