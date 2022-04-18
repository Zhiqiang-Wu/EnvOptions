// @author 吴志强
// @date 2021/10/28

#ifndef ENV_OPTIONS_DLL_CPP_LIBRARY_H
#define ENV_OPTIONS_DLL_CPP_LIBRARY_H

#define WZQ_VK_0 0x30
#define WZQ_VK_1 0x31
#define WZQ_VK_2 0x32
#define WZQ_VK_3 0x33
#define WZQ_VK_4 0x34
#define WZQ_VK_5 0x35
#define WZQ_VK_6 0x36
#define WZQ_VK_7 0x37
#define WZQ_VK_8 0x38
#define WZQ_VK_9 0x39

extern "C" {
void sendSettingChange();
void sendChar(char *code);
}

#endif
