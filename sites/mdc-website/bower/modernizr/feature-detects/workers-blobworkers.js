!function(){try{var e=window.MozBlobBuilder||window.WebKitBlobBuilder||window.MSBlobBuilder||window.OBlobBuilder||window.BlobBuilder,o=window.MozURL||window.webkitURL||window.MSURL||window.OURL||window.URL,n="Modernizr",r=new e;r.append("this.onmessage=function(e){postMessage(e.data)}");var d=o.createObjectURL(r.getBlob()),i=new Worker(d);r=null,i.onmessage=function(e){i.terminate(),o.revokeObjectURL(d),Modernizr.addTest("blobworkers",n===e.data),i=null},i.onerror=function(){Modernizr.addTest("blobworkers",!1),i=null},setTimeout(function(){Modernizr.addTest("blobworkers",!1)},200),i.postMessage(n)}catch(w){Modernizr.addTest("blobworkers",!1)}}();