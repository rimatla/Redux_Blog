import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    componentDidMount() {
        //network usage optimization
        if(!this.props.post) {
            //params = from react-router
            const { id } = this.props.match.params;
            //call action creator
            this.props.fetchPost(id);
        }
    }

    handleDelete() {
        const { id } = this.props.match.params;
        //pass in callback
        this.props.deletePost(id, ()=> {
            this.props.history.push('/'); //home page redirect
        })
    }

    render() {
        const { post } = this.props;
        if (!post) {
            return  <div>Loading...</div>
        }

        return (
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <button className="btn btn-danger pull-xs-right" onClick={this.handleDelete.bind(this)}>Delete Post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

//wire react/redux
function mapStateToProps({posts}, ownProps) { //retrieve only posts out of state object + propsObject headed to PostsShow component
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost })(PostsShow);