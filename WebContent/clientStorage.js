var CLS = {
		
        /**
         * Types of client storage to get instance
         * 
         */
        TYPE : {
           
        	COOKIE : 1,
        	LOCAL : 2,
        	SESSION : 3
        },
        
		/**
		 * This function helps us to check is cookie supported or enabled
		 * 
		 */
		isCookieSupported : function(){
			
			return navigator.cookieEnabled;
		},
		
		/**
		 * This function helps us to check is local storage supported
		 * 
		 */
		isLocalStorageSupported : function(){
			
			return typeof this.getLocalStorageInstance() !== "undefined";
		},
		
		/**
		 * This function helps us to check is session storage supported
		 * 
		 */
		isSessionStorageSupported : function(){
			
			return typeof this.getSessionStorageInstance() !== "undefined"
		},
		
		/**
		 * 
		 * This function gets cookie instance
		 * 
		 */
		getCookieInstance : function(){
			
			return {
				
				set : function(key,value,expiry){
					
					return CLS.setInCookie(key,value,expiry); 
				},
				
				get : function(key){
					
					return CLS.getFromCookie(key);
				},
				
				remove : function(key){
					
					return CLS.removeFromCookie(key);
				}
			};
		},
		
		/**
		 * This function gets the local storage instance
		 * 
		 */
		getLocalStorageInstance : function(){
			
			return {
				
				set : function(key,value){
					
					return CLS.setInLocalStorage(key,value);
				},
				
				get : function(key){
					
					return CLS.getFromLocalStorage(key);
				},
				
				remove : function(key){
					
					return CLS.removeFromLocalStorage(key);
				}
			};
		},

		/**
		 * This function gets the session storage instance
		 * 
		 */
		getSessionStorageInstance : function(){
			
			return {
				
				set : function(key,value){
					
					return CLS.setInSessionStorage(key,value);
				},
				
				get : function(key){
					
					return CLS.getFromSessionStorage(key);
				},
				
				remove : function(key){
					
					return CLS.removeFromSessionStorage(key);
				}
			};
		},
		
		/**
		 * This function sets value in cookie with expiry
		 * 
		 */
		setInCookie : function(key,value,expiry){
			
			try{
				
				var d = new Date();
			    d.setTime(d.getTime() + expiry);
			    var expires = "expires="+d.toUTCString();
			    
				document.cookie = key + "=" + value + ";" + expires + ";path=/";
				
                return true;
			}catch(ex){
				return false;
			}
		},
		
		/**
		 * This function gets value from cookie 
		 * 
		 */
		getFromCookie : function(key){
			
			try{
				
				var name = key + "=";
			    var decodedCookie = decodeURIComponent(document.cookie);
			    var ca = decodedCookie.split(';');
			    
			    for(var i = 0; i <ca.length; i++) {
			    	
			        var c = ca[i];
			        
			        while (c.charAt(0) == ' ') {
			        	
			            c = c.substring(1);
			        }
			        
			        if (c.indexOf(name) == 0) {
			        
			        	return c.substring(name.length, c.length);
			        }
			    }
			    
			    return null;
			}catch(ex){
				
				return null;
			}
		},
		
		/**
		 * This function removes value from cookie
		 * 
		 */
		removeFromCookie : function(key){
			
			try{
				
				document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				
				return true;
			}catch(ex){
				
				return false;
			}
		},
		
		/**
		 * This function sets value in local storage with no expiry
		 * 
		 */
		setInLocalStorage : function(key,value){
			
			try{
				
				localStorage.setItem(key, value);
				
				return true;
			}catch(ex){
				
				return false;
			}
		},
		
		/**
		 * This function gets value from local storage
		 * 
		 */
		getFromLocalStorage : function(key){
			
            try{
				
				return localStorage.getItem(key);
			}catch(ex){
				
				return null;
			}
		},
		
		/**
		 * This function removes value from local storage
		 * 
		 */
		removeFromLocalStorage : function(key){
			
            try{
				
				localStorage.removeItem(key);
				
				return true;
			}catch(ex){
				
				return false;
			}
		},
		
        /**
         * This function sets value in session storage
         * 
         */
        setInSessionStorage : function(key,value){
			
			try{
				
				sessionStorage.setItem(key, value);
				
				return true;
			}catch(ex){
				
				return false;
			}
		},
		
		/**
		 * This function gets value from session storage
		 * 
		 */
		getFromSessionStorage : function(key){
			
            try{
				
				return sessionStorage.getItem(key);
			}catch(ex){
				
				return null;
			}
		},
		
		/**
		 * This function removes value from session storage
		 * 
		 */
		removeFromSessionStorage : function(key){
			
            try{
				
            	sessionStorage.removeItem(key);
				
				return true;
			}catch(ex){
				
				return false;
			}
		},
		
        /**
         * This function gets instance by CLS.TYPE
         * 
         */
        getInstance : function(storeType){
        	
            if(storeType == this.TYPE.COOKIE){
				
				return this.getCookieInstance();
			}else if(storeType == this.TYPE.LOCAL){
				
                return this.getLocalStorageInstance();
			}else if(storeType == this.TYPE.SESSION){
				
                return this.getSessionStorageInstance();
			}

			return null;        	
        }
};
