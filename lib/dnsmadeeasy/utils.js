exports.getArgs = function(a) {
  return Array.prototype.slice.call(a);
};

exports.getCB = function(args) {
  return (typeof args[args.length-1] === 'function') && args.pop();
};
