// Copyright 2026 YANDEX LLC
//
// Licensed under the Apache License, Version 2.0

(function (window, document) {
  'use strict';

  var config = window.yandexWebmasterVerification || {};
  var head = document.head || document.getElementsByTagName('head')[0];

  if (!head) {
    return;
  }

  function trim(value) {
    return typeof value === 'string'
      ? value.replace(/^\s+|\s+$/g, '')
      : '';
  }

  function hasMetaWithToken(token) {
    var metas = head.querySelectorAll('meta[name="yandex-verification"]');

    for (var i = 0; i < metas.length; i += 1) {
      if (metas[i].getAttribute('content') === token) {
        return true;
      }
    }

    return false;
  }

  function addVerificationMeta(token) {
    token = trim(token);

    if (!token || hasMetaWithToken(token)) {
      return;
    }

    var meta = document.createElement('meta');
    meta.setAttribute('name', 'yandex-verification');
    meta.setAttribute('content', token);
    head.appendChild(meta);
  }

  function collectTokens(config) {
    var tokens = [];

    // Новый формат: { tokens: ['token1', 'token2'] }
    if (config && Object.prototype.toString.call(config.tokens) === '[object Array]') {
      for (var i = 0; i < config.tokens.length; i += 1) {
        tokens.push(config.tokens[i]);
      }
    }

    // Обратная совместимость со старым форматом: { token: 'token1' }
    if (config && typeof config.token === 'string') {
      tokens.push(config.token);
    }

    return tokens;
  }

  var tokens = collectTokens(config);

  for (var j = 0; j < tokens.length; j += 1) {
    addVerificationMeta(tokens[j]);
  }
})(window, document);
