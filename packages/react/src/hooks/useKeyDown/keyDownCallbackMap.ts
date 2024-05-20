export type KeyDownCallbackMap = {
  // Modifier keys
  Alt: (event: KeyboardEvent) => void;
  CapsLock: (event: KeyboardEvent) => void;
  Control: (event: KeyboardEvent) => void;
  Fn: (event: KeyboardEvent) => void;
  FnLock: (event: KeyboardEvent) => void;
  Hyper: (event: KeyboardEvent) => void;
  Meta: (event: KeyboardEvent) => void;
  NumLock: (event: KeyboardEvent) => void;
  ScrollLock: (event: KeyboardEvent) => void;
  Shift: (event: KeyboardEvent) => void;
  Super: (event: KeyboardEvent) => void;
  Symbol: (event: KeyboardEvent) => void;
  SymbolLock: (event: KeyboardEvent) => void;

  // Whitespace keys
  Enter: (event: KeyboardEvent) => void;
  Tab: (event: KeyboardEvent) => void;
  ' ': (event: KeyboardEvent) => void;

  // Navigation keys
  ArrowDown: (event: KeyboardEvent) => void;
  ArrowLeft: (event: KeyboardEvent) => void;
  ArrowRight: (event: KeyboardEvent) => void;
  ArrowUp: (event: KeyboardEvent) => void;
  End: (event: KeyboardEvent) => void;
  Home: (event: KeyboardEvent) => void;
  PageDown: (event: KeyboardEvent) => void;
  PageUp: (event: KeyboardEvent) => void;

  // Editing keys
  Backspace: (event: KeyboardEvent) => void;
  Clear: (event: KeyboardEvent) => void;
  Copy: (event: KeyboardEvent) => void;
  CrSel: (event: KeyboardEvent) => void;
  Cut: (event: KeyboardEvent) => void;
  Delete: (event: KeyboardEvent) => void;
  EraseEof: (event: KeyboardEvent) => void;
  ExSel: (event: KeyboardEvent) => void;
  Insert: (event: KeyboardEvent) => void;
  Paste: (event: KeyboardEvent) => void;
  Redo: (event: KeyboardEvent) => void;
  Undo: (event: KeyboardEvent) => void;

  // UI keys
  Accept: (event: KeyboardEvent) => void;
  Again: (event: KeyboardEvent) => void;
  Attn: (event: KeyboardEvent) => void;
  Cancel: (event: KeyboardEvent) => void;
  ContextMenu: (event: KeyboardEvent) => void;
  Escape: (event: KeyboardEvent) => void;
  Execute: (event: KeyboardEvent) => void;
  Find: (event: KeyboardEvent) => void;
  Finish: (event: KeyboardEvent) => void;
  Help: (event: KeyboardEvent) => void;
  Pause: (event: KeyboardEvent) => void;
  Play: (event: KeyboardEvent) => void;
  Props: (event: KeyboardEvent) => void;
  Select: (event: KeyboardEvent) => void;
  ZoomIn: (event: KeyboardEvent) => void;
  ZoomOut: (event: KeyboardEvent) => void;

  // Device keys
  BrightnessDown: (event: KeyboardEvent) => void;
  BrightnessUp: (event: KeyboardEvent) => void;
  Eject: (event: KeyboardEvent) => void;
  LogOff: (event: KeyboardEvent) => void;
  Power: (event: KeyboardEvent) => void;
  PowerOff: (event: KeyboardEvent) => void;
  PrintScreen: (event: KeyboardEvent) => void;
  Hibernate: (event: KeyboardEvent) => void;
  Standby: (event: KeyboardEvent) => void;
  WakeUp: (event: KeyboardEvent) => void;

  // IME and composition keys
  AllCandidates: (event: KeyboardEvent) => void;
  Alphanumeric: (event: KeyboardEvent) => void;
  CodeInput: (event: KeyboardEvent) => void;
  Compose: (event: KeyboardEvent) => void;
  Convert: (event: KeyboardEvent) => void;
  Dead: (event: KeyboardEvent) => void;
  FinalMode: (event: KeyboardEvent) => void;
  GroupFirst: (event: KeyboardEvent) => void;
  GroupLast: (event: KeyboardEvent) => void;
  GroupNext: (event: KeyboardEvent) => void;
  GroupPrevious: (event: KeyboardEvent) => void;
  ModeChange: (event: KeyboardEvent) => void;
  NextCandidate: (event: KeyboardEvent) => void;
  NonConvert: (event: KeyboardEvent) => void;
  PreviousCandidate: (event: KeyboardEvent) => void;
  Process: (event: KeyboardEvent) => void;
  SingleCandidate: (event: KeyboardEvent) => void;

  // Function keys
  F1: (event: KeyboardEvent) => void;
  F2: (event: KeyboardEvent) => void;
  F3: (event: KeyboardEvent) => void;
  F4: (event: KeyboardEvent) => void;
  F5: (event: KeyboardEvent) => void;
  F6: (event: KeyboardEvent) => void;
  F7: (event: KeyboardEvent) => void;
  F8: (event: KeyboardEvent) => void;
  F9: (event: KeyboardEvent) => void;
  F10: (event: KeyboardEvent) => void;
  F11: (event: KeyboardEvent) => void;
  F13: (event: KeyboardEvent) => void;
  F14: (event: KeyboardEvent) => void;
  F15: (event: KeyboardEvent) => void;
  F16: (event: KeyboardEvent) => void;
  F17: (event: KeyboardEvent) => void;
  F18: (event: KeyboardEvent) => void;
  F19: (event: KeyboardEvent) => void;
  F20: (event: KeyboardEvent) => void;
  Soft1: (event: KeyboardEvent) => void;
  Soft2: (event: KeyboardEvent) => void;
  Soft3: (event: KeyboardEvent) => void;
  Soft4: (event: KeyboardEvent) => void;

  // Phone keys
  AppSwitch: (event: KeyboardEvent) => void;
  Call: (event: KeyboardEvent) => void;
  Camera: (event: KeyboardEvent) => void;
  CameraFocus: (event: KeyboardEvent) => void;
  EndCall: (event: KeyboardEvent) => void;
  GoBack: (event: KeyboardEvent) => void;
  GoHome: (event: KeyboardEvent) => void;
  HeadsetHook: (event: KeyboardEvent) => void;
  LastNumberRedial: (event: KeyboardEvent) => void;
  Notification: (event: KeyboardEvent) => void;
  MannerMode: (event: KeyboardEvent) => void;
  VoiceDial: (event: KeyboardEvent) => void;

  // Multimedia keys
  ChannelDown: (event: KeyboardEvent) => void;
  ChannelUp: (event: KeyboardEvent) => void;
  MediaFastForward: (event: KeyboardEvent) => void;
  MediaPause: (event: KeyboardEvent) => void;
  MediaPlay: (event: KeyboardEvent) => void;
  MediaPlayPause: (event: KeyboardEvent) => void;
  MediaRecord: (event: KeyboardEvent) => void;
  MediaRewind: (event: KeyboardEvent) => void;
  MediaStop: (event: KeyboardEvent) => void;
  MediaTrackNext: (event: KeyboardEvent) => void;
  MediaTrackPrevious: (event: KeyboardEvent) => void;

  // Audio control keys
  AudioBalanceLeft: (event: KeyboardEvent) => void;
  AudioBalanceRight: (event: KeyboardEvent) => void;
  AudioBassDown: (event: KeyboardEvent) => void;
  AudioBassBoostDown: (event: KeyboardEvent) => void;
  AudioBassBoostToggle: (event: KeyboardEvent) => void;
  AudioBassBoostUp: (event: KeyboardEvent) => void;
  AudioBassUp: (event: KeyboardEvent) => void;
  AudioFaderFront: (event: KeyboardEvent) => void;
  AudioFaderRear: (event: KeyboardEvent) => void;
  AudioSurroundModeNext: (event: KeyboardEvent) => void;
  AudioTrebleDown: (event: KeyboardEvent) => void;
  AudioTrebleUp: (event: KeyboardEvent) => void;
  AudioVolumeDown: (event: KeyboardEvent) => void;
  AudioVolumeMute: (event: KeyboardEvent) => void;
  AudioVolumeUp: (event: KeyboardEvent) => void;
  MicrophoneToggle: (event: KeyboardEvent) => void;
  MicrophoneVolumeDown: (event: KeyboardEvent) => void;
  MicrophoneVolumeMute: (event: KeyboardEvent) => void;
  MicrophoneVolumeUp: (event: KeyboardEvent) => void;

  // Numeric keypad keys
  0: (event: KeyboardEvent) => void;
  1: (event: KeyboardEvent) => void;
  2: (event: KeyboardEvent) => void;
  3: (event: KeyboardEvent) => void;
  4: (event: KeyboardEvent) => void;
  5: (event: KeyboardEvent) => void;
  6: (event: KeyboardEvent) => void;
  7: (event: KeyboardEvent) => void;
  8: (event: KeyboardEvent) => void;
  9: (event: KeyboardEvent) => void;
  Decimal: (event: KeyboardEvent) => void;
  Key11: (event: KeyboardEvent) => void;
  Key12: (event: KeyboardEvent) => void;
  Multiply: (event: KeyboardEvent) => void;
  Add: (event: KeyboardEvent) => void;
  Divide: (event: KeyboardEvent) => void;
  Subtract: (event: KeyboardEvent) => void;
  Separator: (event: KeyboardEvent) => void;

  // Special characters keys
  '`': (event: KeyboardEvent) => void;
  '₩': (event: KeyboardEvent) => void;
  '!': (event: KeyboardEvent) => void;
  '@': (event: KeyboardEvent) => void;
  '#': (event: KeyboardEvent) => void;
  $: (event: KeyboardEvent) => void;
  '%': (event: KeyboardEvent) => void;
  '^': (event: KeyboardEvent) => void;
  '&': (event: KeyboardEvent) => void;
  '*': (event: KeyboardEvent) => void;
  '(': (event: KeyboardEvent) => void;
  ')': (event: KeyboardEvent) => void;
  _: (event: KeyboardEvent) => void;
  '+': (event: KeyboardEvent) => void;
  '=': (event: KeyboardEvent) => void;
  '-': (event: KeyboardEvent) => void;
  '[': (event: KeyboardEvent) => void;
  ']': (event: KeyboardEvent) => void;
  '{': (event: KeyboardEvent) => void;
  '}': (event: KeyboardEvent) => void;
  '/': (event: KeyboardEvent) => void;
  '?': (event: KeyboardEvent) => void;
  '<': (event: KeyboardEvent) => void;
  '>': (event: KeyboardEvent) => void;
  '.': (event: KeyboardEvent) => void;
  ',': (event: KeyboardEvent) => void;
  "'": (event: KeyboardEvent) => void;
  '"': (event: KeyboardEvent) => void;
  '\\': (event: KeyboardEvent) => void;
  '|': (event: KeyboardEvent) => void;
  ';': (event: KeyboardEvent) => void;
  ':': (event: KeyboardEvent) => void;

  // alphabet keys
  a: (event: KeyboardEvent) => void;
  b: (event: KeyboardEvent) => void;
  c: (event: KeyboardEvent) => void;
  d: (event: KeyboardEvent) => void;
  e: (event: KeyboardEvent) => void;
  f: (event: KeyboardEvent) => void;
  g: (event: KeyboardEvent) => void;
  h: (event: KeyboardEvent) => void;
  i: (event: KeyboardEvent) => void;
  j: (event: KeyboardEvent) => void;
  k: (event: KeyboardEvent) => void;
  l: (event: KeyboardEvent) => void;
  m: (event: KeyboardEvent) => void;
  n: (event: KeyboardEvent) => void;
  o: (event: KeyboardEvent) => void;
  p: (event: KeyboardEvent) => void;
  q: (event: KeyboardEvent) => void;
  r: (event: KeyboardEvent) => void;
  s: (event: KeyboardEvent) => void;
  t: (event: KeyboardEvent) => void;
  u: (event: KeyboardEvent) => void;
  v: (event: KeyboardEvent) => void;
  w: (event: KeyboardEvent) => void;
  x: (event: KeyboardEvent) => void;
  y: (event: KeyboardEvent) => void;
  z: (event: KeyboardEvent) => void;
  A: (event: KeyboardEvent) => void;
  B: (event: KeyboardEvent) => void;
  C: (event: KeyboardEvent) => void;
  D: (event: KeyboardEvent) => void;
  E: (event: KeyboardEvent) => void;
  F: (event: KeyboardEvent) => void;
  G: (event: KeyboardEvent) => void;
  H: (event: KeyboardEvent) => void;
  I: (event: KeyboardEvent) => void;
  J: (event: KeyboardEvent) => void;
  K: (event: KeyboardEvent) => void;
  L: (event: KeyboardEvent) => void;
  M: (event: KeyboardEvent) => void;
  N: (event: KeyboardEvent) => void;
  O: (event: KeyboardEvent) => void;
  P: (event: KeyboardEvent) => void;
  Q: (event: KeyboardEvent) => void;
  R: (event: KeyboardEvent) => void;
  S: (event: KeyboardEvent) => void;
  T: (event: KeyboardEvent) => void;
  U: (event: KeyboardEvent) => void;
  V: (event: KeyboardEvent) => void;
  W: (event: KeyboardEvent) => void;
  X: (event: KeyboardEvent) => void;
  Y: (event: KeyboardEvent) => void;
  Z: (event: KeyboardEvent) => void;

  // index signature
  [key: string]: (event: KeyboardEvent) => void;
};
