var Nav = function( params ){
   
    this.options = {
       
       sectionClass     : "section",
       navClass         : "fixedNav",
       content          : "content"
     
    }; 
        
    if ( typeof params === 'object' ) {
        for ( option in params ) {
          value = params[ option ];
          this.options[ option ] = value;
        }
    }
    
    this.sections = {};
    this.scrollIntervals = {};
    
    this.$section = null;
    this.$navWrapper = null;
    this.$navEl = null;    
    this.$contentWrapper = null;
    
    this.currentNav = null;
    this.startOffset = 0;
    
    this.init = function(){
        
        
        this.$section = $( '.' + this.options.sectionClass );
        
        this.$navWrapper = $( '.' + this.options.navClass );
        this.$navEl = $('.' + this.options.navClass + ' li');
        this.$contentWrapper = $('.' + this.options.content );
        
        var self = this;

        //generate navigation
        $.each( this.$section, function( index, value ){
              
              var newSection = {
                  name         : $( value ).attr( "data-title" ),
                  offset       : 0,
                  offsetBottom : 0, 
                  navIndex     : index,
                  navCurrent   : false
              }
              
              
              self.sections[ index ] = newSection;
              
        });
        
        this.startOffset = this.$contentWrapper.offset().top;
        
        this.updateOffsets();
        this.updateNavigation();
        this.click();
        this.handlers();
    };
    
    this.click = function(){
        
        var self = this,
            section = null;
        
        this.$navEl.click( function(){

            var index = $( this ).index() ;
            
            self.scrollTo( self.sections[ index ] );
        
        });
        //on click event scroll to section clicked
        
        //this.scrollTo( section );
        
    };
    
    this.scrollTo = function( section ){
        
        console.log(section.offset)
        $( 'html' ).animate( { scrollTop: section.offset }, 800);
        
    };
    
    this.updateNavigation = function(){
        //check scroll position and set appropriate menu link to "current"
        var scrollOffset = $( window ).scrollTop(); 
                           
        for( i = 0, len = this.$section.length; i < len; i++ ){
         
            if( scrollOffset >= this.sections[ i ].offset && scrollOffset <= this.sections[ i ].offsetBottom ){
                
                this.currentNav = this.sections[ i ].navIndex;
               
            }
             
            this.updateStyles();
        }
        
    };
    
    this.updateStyles = function(){
        
        var curr =  $( this.$navEl[ this.currentNav ] );
        
        console.log(curr);
        
        if( !curr.hasClass( 'current' ) ) {
            $( this.$navEl ).removeClass( 'current' );
            curr.addClass( 'current' );
        }else{
            
            curr.addClass( 'current' );
        }
        
        
        
        
    };
    
    this.updateOffsets = function(){
        var self = this;
        
        $.each( this.$section, function( index, value ){
             
              self.sections[ index ].offset = Math.floor( $( value ).offset().top - self.startOffset );
              
              if( index < self.$section.length - 1 ){
                var end = $( value ).next().offset();
                self.sections[ index ].offsetBottom = Math.floor(end.top - self.startOffset - 1);
              }else{
                self.sections[ index ].offsetBottom = Math.floor( $( document ).height());
              }
       
        });        
        
    };
    
    this.handlers = function(){
        var self = this;
        
        //on resize - adjust height of sections
        $( window ).resize( function(){
            self.updateOffsets();        
            self.updateNavigation();    
        });
        
        
        //on scroll update navigation if necessary
        $( window ).scroll( function(){
            self.updateNavigation();
            
        });
        
    };
    
    return this;
}
