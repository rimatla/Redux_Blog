import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from '../actions/index';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderField(field) {
        const {meta: {touched, error}} = field;
        //conditional styling
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" {...field.input} type="text"/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    //submit form
    onSubmit(values) {
        //console.log(values);
        this.props.createPost(values, () => { //callback
            this.props.history.push('/'); //home page redirect
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            //make one Field component per piece of state
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component ={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component ={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component ={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

//helper method
function validate(values) {
    //console.log(values);
    const errors = {};
    //validate inputs from values object
    if (!values.title || values.title.length < 3) {
        errors.title = 'Must Have a Title with at least 3 characters'
    }
    if (!values.categories) {
        errors.categories = 'Must Have a Category'
    }
    if (!values.content) {
        errors.content = 'Please enter content'
    }
    //if errors is empty, form is fine to submit, else if it has *any* properties, redux-form assumes form is invalid
    return errors;
}

//wire react/redux/reduxForm
export default  reduxForm({
    validate,
    form: 'PostsNewForm'
})(connect(null, {createPost})(PostsNew));