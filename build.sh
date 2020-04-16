#!/bin/bash
rm -rf dist 
tsc
shopt -s extglob 
rm -rf package/!("package.json"|".git")
cp -rf dist/* package