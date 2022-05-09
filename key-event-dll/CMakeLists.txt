cmake_minimum_required(VERSION 3.20)
project(env_options_dll_cpp)

set(CMAKE_CXX_STANDARD 23)

add_library(env_options_dll_cpp SHARED library.cpp)
