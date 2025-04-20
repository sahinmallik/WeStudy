// This polyfill ensures SHA224 is properly defined
// Based on the error message, this seems to be what's missing in production
(function () {
  if (typeof window !== "undefined") {
    // Wait for CryptoJS to be available
    const interval = setInterval(() => {
      if (window.CryptoJS) {
        const c = window.CryptoJS;

        // Check if SHA224 is already defined
        if (!c.SHA224 && c.SHA256) {
          try {
            // Define SHA224 based on SHA256
            c.SHA224 = c.SHA256.extend({
              _doReset: function () {
                this._hash = new c.lib.WordArray.init([
                  0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31,
                  0x68581511, 0x64f98fa7, 0xbefa4fa4,
                ]);
              },
              _doFinalize: function () {
                const e = c.SHA256._doFinalize.call(this);
                e.sigBytes -= 4;
                return e;
              },
            });

            console.log("SHA224 polyfill successfully applied");
          } catch (e) {
            console.error("Error applying SHA224 polyfill:", e);
          }
        }

        clearInterval(interval);
      }
    }, 100);

    // Clear the interval after 10 seconds to prevent memory leaks
    setTimeout(() => clearInterval(interval), 10000);
  }
})();
