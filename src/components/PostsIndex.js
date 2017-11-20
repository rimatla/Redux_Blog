import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {
    //run as soon as component finished loading
    componentDidMount() {
        //call action creator
        this.props.fetchPosts();
    }

    renderPosts() {
        //lodash's map can also manipulate objects rather than just arrays
        return _.map(this.props.posts, o => {
            return (
                <Link to={`/posts/${o.id}`} key={o.id}>
                    <li className="list-group-item" key={o.id}>{o.title}</li>
                </Link>
            )
        })
    }

    render() {
        console.log(this.props.posts);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">Add Post</Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

//app level state
function mapStateToProps(state) {
    return {posts: state.posts}
}

//wire redux/react
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);