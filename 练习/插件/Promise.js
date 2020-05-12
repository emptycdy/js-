(function () {

    const PENDGING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';


    function Promise(excutor) {
        const self = this;
        self.status = PENDGING;
        self.data = undefined;
        self.callbacks = [];

        function resolve(value) {
            if (self.status !== PENDGING) {
                return;
            }
            self.status = RESOLVED;
            self.data = value;
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolve(value);
                    });
                })
            }
        }

        function reject(reason) {
            if (self.status !== PENDGING) {
                return;
            }
            self.status = REJECTED;
            self.data = reason;
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onReject(reason);
                    });
                })
            }
        }

        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error);
        }
    }

    Promise.prototype.then = function (onResolve, onReject) {

        onResolve = typeof onResolve === 'function' ? onResolve : value => value;

        onReject = typeof onReject === 'function' ? onReject : reason => {
            throw reason;
        };

        const self = this;

        return new Promise((resolve, reject) => {

            function handle(callbacks) {
                try {
                    const result = callbacks(self.data);
                    if (result instanceof Promise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }

            if (self.status === PENDGING) {
                self.callbacks.push({
                    onResolve(value) {
                        handle(onResolve)
                    },
                    onReject(reason) {
                        handle(onReject)
                    }
                })
            } else if (self.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolve);
                });
            } else {
                setTimeout(() => {
                    handle(onReject)
                });
            }

        });

    }

    Promise.prototype.catch = function (onReject) {
        return this.then(undefined, onReject);
    }

    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }

    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    Promise.all = function (promises) {

        const values = new Array(promises.length);
        let resolvedCount = 0;
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        resolvedCount++;
                        values[index] = value;
                        if (resolvedCount === promises.length) {
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }

    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }

    Promise.resolveDelay = function (value, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value instanceof Promise) {
                    value.then(resolve, reject);
                } else {
                    resolve(value);
                }
            }, time)
        })
    }

    Promise.rejectDelay = function (reason, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(reason);
            }, time)
        })
    }


    window.Promise = Promise;


})(window)