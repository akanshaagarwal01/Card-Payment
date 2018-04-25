(function() {
  function Storage() {}
  Storage.prototype.getItem = function(key) {
    return localStorage.getItem(key);
  };
  Storage.prototype.setItem = function(key, value) {
    localStorage.setItem(key, value);
  };
  window.Storage = Storage;
})();
