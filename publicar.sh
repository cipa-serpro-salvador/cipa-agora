#!/bin/bash

  function acp {
    git add -A .
    git commit -m "$*"
    git pull
    git push
  }

ng build --aot=true --prod=true --outputPath=docs
acp Publicacao
