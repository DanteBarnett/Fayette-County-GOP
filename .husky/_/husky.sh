#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "true" ] && echo "husky (debug) - $1"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ "$(git rev-parse --git-dir 2>/dev/null)" ]; then
    if [ -f ~/.huskyrc ]; then
      debug "~/.huskyrc found, source..."
      . ~/.huskyrc
    fi
    export readonly husky_skip_init=1
    sh -e "$(dirname "$0")/../../.husky/$hook_name" "$@"
  fi
fi