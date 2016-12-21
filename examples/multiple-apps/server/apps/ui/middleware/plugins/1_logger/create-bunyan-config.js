module.exports = function createBunyanConfig(server, logger) {
  return {
    updateLogFields: function (fields) {
      fields.status = this.response.status;
      fields.uri = this.request.url;
      fields.method = this.request.method;
    }
  };
}
