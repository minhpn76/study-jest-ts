/**
 * @jest-environment jsdom
*/
import CustomForm, { ICustomForm } from '../form'
import { mount, configure, shallow, render } from 'enzyme';

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
configure({adapter: new Adapter()});

let wrapped: any

beforeEach(() => {
  const onSubmit = jest.fn()
  wrapped = mount(
    <CustomForm onSubmit={onSubmit} />
  )
})

// afterEach(() => {
// 	wrapped.ummount()
// })

describe('the form', () => {
  it('should has a input and a button', () => {
    expect(wrapped.find('input').length).toEqual(1)
    expect(wrapped.find('button').length).toEqual(1)
  })
  
  it('should input empty when initation', () => {
    expect(wrapped.find('input').props().value).toBe(undefined)
  })
  
  it('should has class in a button', () => {
    expect(wrapped.find('button').hasClass('buttonSubmit')).toEqual(true)
  })

  it('should has a text on the button', () => {
    const button = wrapped.find('button');
    expect(button.text()).toEqual('Submit');
  });
  
  it('should display correct error message', () => {
    wrapped.find('form').simulate('submit', {
      preventDefault: () => {}
    })
    console.log('wrapped', wrapped.debug());
    // expect(wrapped.find('p').text()).toBe('Your name is required')
    // expect(wrapped.html()).toContain('<p>Your name is required</p>')
    // const onSubmit = jest.fn();
    // expect(onSubmit).toHaveBeenLastCalledWith(
    //   expect.objectContaining({
    //     username: "Hooray!"
    //   })
    // );
  });
});

describe('the input', () => {
  beforeEach(() => {
    wrapped.find('input').simulate('change', {
      target: { value: 'edward.pn' }
    })
    wrapped.update()
  })
  

  // it('has a input empty that users has recived error message', () => {
    // wrapped.find('input').simulate('change', {
    //   target: { value: '' }
    // })
    // wrapped.update()
    // console.log('333', wrapped.find('p').debug());
    // expect(wrapped.find('p').prop('value')).toEqual('Your name is required')
  // })

  it('when form is submiited, form has called', () => {
    const spy = jest.spyOn(wrapped.instance(), "onSubmit");
    wrapped.find('form').simulate('submit', {
      preventDefault: () => {}
    })
    expect(spy).toHaveBeenCalledTimes(1);
  })

})