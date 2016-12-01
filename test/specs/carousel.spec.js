'use strict';

describe('Carousel', function () {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');
  var renderer = require('react-test-renderer');
  var shallow = require('enzyme').shallow;
  var mount = require('enzyme').mount;

  var Carousel, container, component, tree;

  function setup() {
    Carousel = require('../../src/carousel').default;
  }
  function teardown() {
    Carousel = null;
  }

  // helper utilities for tests
  function getComponentsWithClassName(component, classname) {
    return TestUtils.scryRenderedDOMComponentsWithClass(
      component,
      classname
    );
  }

  function getSingleComponentWithClassName(component, classname) {
    return TestUtils.findRenderedDOMComponentWithClass(
      component,
      classname
    );
  }

  describe('Mounting', function() {

    beforeEach(function() {
      setup();
      component = shallow(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
    });

    afterEach(function() {
      teardown();
    });

    it('should render with its children', function() {
      expect(component).toBeDefined();
      expect(component.contains(<p>Slide 1</p>)).toBe(true);
      expect(component.contains(<p>Slide 2</p>)).toBe(true);
      expect(component.contains(<p>Slide 3</p>)).toBe(true);
    });

  });

  describe('Build', function() {

    beforeEach(function() {
      setup();

      component = shallow(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
    });

    afterEach(function() {
      teardown();
    });

    it('should render a .slider div', function() {
      expect(component.find('.slider')).toHaveLength(1);
    });

    it('should render a .slider-frame div', function() {
      expect(component.find('.slider-frame')).toHaveLength(1);
    });

    it('should render a .slider-list ul', function() {
      expect(component.find('.slider-list')).toHaveLength(1);
    });

    it('should render children with a .slider-slide class', function() {
        expect(component.find('.slider-slide')).toHaveLength(3);
    });

    it('should render decorators by default', function() {
        var decorator1 = component.find('.slider-decorator-0');
        var decorator2 = component.find('.slider-decorator-1');
        var decorator3 = component.find('.slider-decorator-2');
       
        expect(decorator1).toHaveLength(1);
        expect(decorator2).toHaveLength(1);
        expect(decorator3).toHaveLength(1);
    });

  });

  describe('Props', function() {

    beforeEach(function() {
      setup();

      component = shallow(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
    });

    afterEach(function() {
      teardown();
    });

    it('should render with class "slider" with no props supplied', function() {
      expect(component.find('.slider')).toHaveLength(1);
    });

    it('should render with class "test" with className supplied', function() {
      component = shallow(
        <Carousel className='test'>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.find('.test')).toHaveLength(1);
    });

    it('should merge provided styles with the defaults', function() {
      component = shallow(
        <Carousel style={{ backgroundColor: 'black' }}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slider = component.find('.slider');
      expect(slider.prop('style').backgroundColor).toEqual('black');
      expect(slider.prop('style').display).toEqual('block');
    });

    it('should align to 0 if cellAlign is left', function() {
      component = shallow(
        <Carousel
          slidesToShow={3}
          cellAlign='left'
          width='500px'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slider = component.find('.slider-list');
      expect(slider.prop('style').transform).toEqual('translate3d(0px, 0px, 0)');
    });

    it('should align to 200 if cellAlign is center', function() {
      component = shallow(
        <Carousel
          slidesToShow={3}
          cellAlign='center'
          width='600px'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slider = component.find('.slider-list');
      expect(slider.prop('style').transform).toEqual('translate3d(0px, 0px, 0)');
    });

    it('should align to 400 if cellAlign is right', function() {
      component = shallow(
        <Carousel
          slidesToShow={3}
          cellAlign='right'
          width='600px'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slider = component.find('.slider-list');
      expect(slider.prop('style').transform).toEqual('translate3d(0px, 0px, 0)');
    });

    it('should set slide width to 0 if cellSpacing is not provided', function() {
      component = shallow(
        <Carousel
          slidesToShow={3}
          width='600px'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      var slider = component.find('.slider-slide');
      expect(slider.at(0).prop('style').width).toEqual(0);
    });

    it('should not add mouse handlers if dragging is false', function() {
      component = shallow(
        <Carousel
          dragging={false}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var frame = component.find('.slider-frame');
      expect(frame.prop('onMouseDown')).toBeUndefined;
    });

    it('should add mouse handlers if dragging is true', function() {
      component = shallow(
        <Carousel
          dragging={true}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var frame = component.find('.slider-frame');
      expect(frame.prop('onMouseDown')).toBeDefined;
    });

    it('should add frame margin if framePadding is supplied a value', function() {
      component = shallow(
        <Carousel framePadding='40px'>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var frame = component.find('.slider-frame');
      expect(frame.prop('style').margin).toEqual('40px');
    });

    it('should set slideWidth to 1000 if slidesToShow is 1', function() {
      component = shallow(
        <Carousel
          slidesToShow={1}
          width='1000px'
        >
          <p className='test-slide'>
            Slide 1
          </p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slide = component.find('.slider-slide');
      expect(slide.at(0).prop('style').width).toEqual(0);
    });

    it('should set slideWidth to 200 if slidesToShow is 3', function() {
      component = shallow(
        <Carousel
          slidesToShow={3}
          width='600px'
        >
          <p className='test-slide'>
            Slide 1
          </p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var slide = component.find('.slider-slide');
      expect(slide.at(0).prop('style').width).toEqual(0);
    });

    it('should have currentSlide equal 2 for 4 slides if slidesToShow is 2, slidesToScroll is 2, and it advances', function() {
      component = mount(
        <Carousel
          slidesToShow={2}
          slidesToScroll={2}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
          <p>Slide 5</p>
        </Carousel>
      );

      component.instance().nextSlide();
      expect(component.state('currentSlide')).toEqual(2);
    });

    it('should have currentSlide equal 1 for 3 slides if slidesToShow is 2, slidesToScroll is 2, and it advances', function() {
      component = mount(
        <Carousel
          slidesToShow={2}
          slidesToScroll={2}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      component.find('button').at(1).prop('onClick')({preventDefault: function(){}});

      expect(component.state('currentSlide')).toEqual(1);
    });

    it('should set slidesToScroll to passed in slidesToScroll', function() {
      component = shallow(
        <Carousel
          width='600px'
          slidesToScroll={3}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      
      expect(component.state('slidesToScroll')).toEqual(3);
    });

    it('should set slidesToScroll to 1 if slideWidth is 250px and slidesToScroll is auto', function() {
      component = mount(
        <Carousel
          slideWidth='250px'
          width='600px'
          slidesToScroll='auto'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.state('slidesToScroll')).toEqual(1);
    });

    it('should set slidesToScroll to 2 with slideWidth: 100px, cellSpacing: 100, slidesToScroll:auto', function() {
      component = mount(
        <Carousel
          slideWidth='100px'
          width='600px'
          cellSpacing={100}
          slidesToScroll='auto'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.state('slidesToScroll')).toEqual(2);
    });

    it('should set slidesToScroll to 4 if slideWidth is 100px and slidesToScroll is auto', function() {
      component = mount(
        <Carousel
          slideWidth='100px'
          width='600px'
          slidesToScroll='auto'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.state('slidesToScroll')).toEqual(4);
    });

    it('should set lazyLoad to true if passed in lazyLoad', function() {
      component = mount(
        <Carousel
          lazyLoad={true}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

        expect(component.prop('lazyLoad')).toEqual(true);
    });

    it('should set autoPlay to true if passed in autoPlay', function() {
      component = mount(
        <Carousel
          autoplay={true}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.prop('autoplay')).toEqual(true);
    });

    it('should set vertical to true and set container height to "100" if passed in vertical with no slides', function() {
      component = mount(<Carousel vertical={true} />);
      var slideNode = component.find('.slider-frame');

      expect(slideNode).toHaveLength(1);
      expect(slideNode.at(0).prop('style').height).toEqual(100);
    });

    it('should set vertical to true and set height to "auto" passed in vertical with slides', function() {
      component = mount(
        <Carousel
          vertical={true}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      var slideNode = component.find('.slider-slide');
      expect(slideNode).toHaveLength(3);
      expect(slideNode.at(0).prop('style').height).toEqual('auto');
    });

    it('should set heightMode to "max" if passed in heightMode with "max"', function() {
      component = mount(
        <Carousel
          heightMode='max'
        >
          <p style={{height: '200px'}}>Slide 1</p>
          <p style={{height: '151px'}}>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
        expect(component.prop('heightMode')).toEqual('max');
        expect(component.state('slideHeight')).toEqual(232);
    });

    it('should set heightMode to "adaptive" passed in heightMode with "adaptive"', function() {
      component = mount(
        <Carousel
          heightMode='adaptive'
        >
          <p style={{height: '200px'}}>Slide 1</p>
          <p style={{height: '151px'}}>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      expect(component.prop('heightMode')).toEqual('adaptive');
      expect(component.state('slideHeight')).toEqual(232);
    });

    it('should render with decorator components if passed in', function() {
      function createDecorator(position, label, passedClass) {
        return {
          component: React.createClass({
            render() {
              return(<div className={passedClass}>
                {label}
              </div>
              )
            }
          }),
          position: position,
          style: {
            padding: 20
          }
        }
      }

      var topLeftDecorator = createDecorator('TopLeft', 'TL Decorator', 'tl-dec');
      var topCenterDecorator = createDecorator('TopCenter', 'TC Decorator', 'tc-dec');
      var topRightDecorator = createDecorator('TopRight', 'TR Decorator', 'tr-dec');
      var centerCenterDecorator = createDecorator('CenterCenter', 'CC Decorator', 'cc-dec');
      var bottomRightDecorator = createDecorator('BottomRight', 'BR Decorator', 'br-dec');
      var bottomCenterDecorator = createDecorator('BottomCenter', 'BC Decorator', 'bc-dec');
      var bottomLeftDecorator = createDecorator('BottomLeft', 'BL Decorator', 'bl-dec');

      component = mount(
        <Carousel
          decorators={[
            topLeftDecorator,
            topCenterDecorator,
            topRightDecorator,
            centerCenterDecorator,
            bottomLeftDecorator,
            bottomCenterDecorator,
            bottomRightDecorator
          ]}
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var trNode = component.find('.tr-dec');
      var tcNode = component.find('.tc-dec');
      var tlNode = component.find('.tl-dec');
      var ccNode = component.find('.cc-dec');
      var blNode = component.find('.bl-dec');
      var bcNode = component.find('.bc-dec');
      var brNode = component.find('.br-dec');

      expect(trNode).toHaveLength(1);
      expect(trNode.at(0).text()).toEqual('TR Decorator');
      expect(tcNode).toHaveLength(1);
      expect(tcNode.at(0).text()).toEqual('TC Decorator');
      expect(tlNode).toHaveLength(1);
      expect(tlNode.at(0).text()).toEqual('TL Decorator');
      expect(ccNode).toHaveLength(1);
      expect(ccNode.at(0).text()).toEqual('CC Decorator');
      expect(blNode).toHaveLength(1);
      expect(blNode.at(0).text()).toEqual('BL Decorator');
      expect(bcNode).toHaveLength(1);
      expect(bcNode.at(0).text()).toEqual('BC Decorator');
      expect(brNode).toHaveLength(1);
      expect(brNode.at(0).text()).toEqual('BR Decorator');
    });
  });

  describe('Methods', function() {

    beforeEach(function() {
      setup();

      component = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
    });

    afterEach(function() {
      teardown();
    });

    it('should advance if nextSlide() is called', function() {
      component.instance().nextSlide();

      expect(component.state('currentSlide')).toEqual(1);
    });

    it('should not advance if nextSlide() is called and the currentSlide is the last slide', function() {
      var instance = component.instance();
      instance.nextSlide();
      instance.nextSlide();
      instance.nextSlide();

      expect(component.state('currentSlide')).toEqual(2);
    });

    it('should not go back if previousSlide() is called and the currentSlide is the first slide', function() {
      component.instance().previousSlide();

      expect(component.state('currentSlide')).toEqual(0);
    });

    it('should go back if previousSlide() is called', function() {
      component.instance().nextSlide();
      component.instance().previousSlide();

      expect(component.state('currentSlide')).toEqual(0);
    });

    it('should advance, go back and wrap around if nextSlide() is called and wraparound is true', function() {
      component = mount(
        <Carousel wrapAround={true}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );

      var instance = component.instance();

      instance.nextSlide();
      expect(component.state('currentSlide')).toEqual(1);
      instance.nextSlide();
      expect(component.state('currentSlide')).toEqual(2);
      instance.nextSlide();
      expect(component.state('currentSlide')).toEqual(0);
      instance.previousSlide();
      expect(component.state('currentSlide')).toEqual(2);
    });


    it('should go to 2 if goToSlide(2) is called', function() {
      component.instance().goToSlide(2);
      expect(component.state('currentSlide')).toEqual(2);
    });

    it('should go to 2 if goToSlide(2) is called and in auto', function() {
      component = mount(
        <Carousel
          slidesToShow={2}
          slidesToScroll='auto'
        >
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
          <p>Slide 4</p>
        </Carousel>
      );

      component.instance().nextSlide();
      expect(component.state('currentSlide')).toEqual(2);
    });

  });

});
