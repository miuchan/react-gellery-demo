#!/bin/bash

dir=./src/images
ext=.png
name=0
for file in $(ls $dir | grep $ext)
        do
        ((name++))
        mv "  $file" ${name}.$ext
        done
echo "Rename done!"
