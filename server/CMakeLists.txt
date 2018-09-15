cmake_minimum_required(VERSION 3.8)
project(server)

set(SOURCE_FILES
        driver.c
        Protocol.h
        server.h)

add_executable(server ${SOURCE_FILES})