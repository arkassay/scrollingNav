var Nav = function( params ){
   
    this.options = {
       
       sectionClass    : "section",
       navClass     : "fixedNav",
     
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
    
    this.init = function(){
        
        
        this.$section = $( '.' + this.options.sectionClass );
        
        this.$navWrapper = $( '.' + this.options.navClass );
        this.$navEl = $('.' + this.options.navClass + ' li');

        var self = this;

        //generate navigation
        $.each( this.$section, function( index, value ){
              
              var newSection = {
                  name         : $( value ).attr( "data-title" ),
                  offset       : 0,
                  offsetBottom : 0, 
                  navIndex     : index
              }
              
              
              self.sections[ index ] = newSection;
              
        });
        
        this.updateOffsets();
        this.click();
        this.handlers();
    };
    
    this.click = function(){
        
        var self = this,
            section = null;
        
        this.$navEl.click( function(){

            var index = $( this ).index() ;
            
            $( self.$navEl ).removeClass( 'current' );
            $( this ).addClass( 'current' );
            
            section = self.$section[ index ];
            
            $( self.$section ).removeClass( 'current' );
            
            $( section ).addClass( 'current' );
            
            self.scrollTo( self.sections[ index ] );
        
        });
        //on click event scroll to section clicked
        
        //this.scrollTo( section );
        
    };
    
    this.scrollTo = function( section ){
        
        $( 'html' ).animate( { scrollTop: section.offset }, 800);
        
    };
    
    this.updateNavigation = function(){
        //check scroll position and set appropriate menu link to "current"
        var scrollOffset = $( 'html' ).scrollTop();   
        
        
    };
    
    this.updateOffsets = function(){
        var self = this;
        
        $.each( this.$section, function( index, value ){
             
              self.sections[ index ].offset = $( value ).offset().top - self.$navWrapper.height();
              if( index < self.$section.length - 1 ){
                var end = $( value ).next().offset();
                self.sections[ index ].offsetBottom = end.top - self.$navWrapper.height() - 1;
              }else{
                self.sections[ index ].offsetBottom = $( 'html' ).height();
              }
       
        });        
        
    };
    
    this.handlers = function(){
        var self = this;
        
        //on resize - adjust height of sections
        $( window ).resize( function(){
            self.updateOffsets();            
        });
        
        
        //on scroll update navigation if necessary
        $( 'html' ).scroll( function(){
            self.updateNavigation();
            
        });
        
    };
    
    return this;
}

var features = {
    
    init : function(){
        
    },
    
    click : function(){
        
    },
    
    showFeature : function( feature ){
        
    },
    
    hideFeature : function( feature ){
        
    }
    
    
}

var reviews = {
    
}

var bannerScreen = {
    
}
