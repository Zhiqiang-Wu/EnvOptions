// @author 吴志强
// @date 2021/10/28

#include "library.h"
#include <windows.h>

void sendSettingChange() {
    SendMessageTimeout(HWND_BROADCAST, WM_SETTINGCHANGE, 0, LPARAM("Environment"), SMTO_ABORTIFHUNG, 100, nullptr);
}

/**
 * 小写
 */
static bool isLowerCase(int ascii) {
    return ascii >= 97 && ascii <= 122;
}

/**
 * 大写
 */
static bool isUpperCase(int ascii) {
    return ascii >= 65 && ascii <= 90;
}

static void keybdEvent(int keycode, bool shift) {
    if (shift) {
        keybd_event(VK_SHIFT, 0, 0, 0);
    }
    keybd_event(keycode, 0, 0, 0);
    keybd_event(keycode, 0, KEYEVENTF_KEYUP, 0);
    if (shift) {
        keybd_event(VK_SHIFT, 0, KEYEVENTF_KEYUP, 0);
    }
}

void sendChar(char *str) {
    unsigned int length = strlen(str);
    for (unsigned int i = 0; i < length; i++) {
        const int ascii = str[i];
        if (isLowerCase(ascii)) {
            // 小写
            DWORD isUpperCaseStatus = GetKeyState(VK_CAPITAL);
            keybdEvent(ascii - 32, isUpperCaseStatus);
        } else if (isUpperCase(ascii)) {
            // 大写
            DWORD isUpperCaseStatus = GetKeyState(VK_CAPITAL);
            keybdEvent(ascii, !isUpperCaseStatus);
        } else {
            switch (ascii) {
                case 41:
                    // )
                    keybdEvent(WZQ_VK_0, true);
                    break;
                case 33:
                    // !
                    keybdEvent(WZQ_VK_1, true);
                    break;
                case 64:
                    // @
                    keybdEvent(WZQ_VK_2, true);
                    break;
                case 35:
                    // #
                    keybdEvent(WZQ_VK_3, true);
                    break;
                case 36:
                    // $
                    keybdEvent(WZQ_VK_4, true);
                    break;
                case 37:
                    // %
                    keybdEvent(WZQ_VK_5, true);
                    break;
                case 94:
                    // ^
                    keybdEvent(WZQ_VK_6, true);
                    break;
                case 38:
                    // &
                    keybdEvent(WZQ_VK_7, true);
                    break;
                case 42:
                    // *
                    keybdEvent(WZQ_VK_8, true);
                    break;
                case 40:
                    // (
                    keybdEvent(WZQ_VK_9, true);
                    break;
                case 43:
                    // +
                    keybdEvent(VK_OEM_PLUS, true);
                    break;
                case 95:
                    // _
                    keybdEvent(VK_OEM_MINUS, true);
                    break;
                case 126:
                    // ~
                    keybdEvent(VK_OEM_3, true);
                    break;
                case 61:
                    // =
                    keybdEvent(VK_OEM_PLUS, false);
                    break;
                case 45:
                    // -
                    keybdEvent(VK_OEM_MINUS, false);
                    break;
                case 58:
                    // :
                    keybdEvent(VK_OEM_1, true);
                    break;
                case 34:
                    // "
                    keybdEvent(VK_OEM_7, true);
                    break;
                case 60:
                    // <
                    keybdEvent(VK_OEM_COMMA, true);
                    break;
                case 62:
                    // >
                    keybdEvent(VK_OEM_PERIOD, true);
                    break;
                case 63:
                    // ?
                    keybdEvent(VK_OEM_2, true);
                    break;
                case 123:
                    // {
                    keybdEvent(VK_OEM_4, true);
                    break;
                case 125:
                    // }
                    keybdEvent(VK_OEM_6, true);
                    break;
                case 124:
                    // |
                    keybdEvent(VK_OEM_5, true);
                    break;
                case 47:
                    // /
                    keybdEvent(VK_OEM_2, false);
                    break;
                default:
                    keybdEvent(ascii, false);
                    break;
            }
        }
    }
}