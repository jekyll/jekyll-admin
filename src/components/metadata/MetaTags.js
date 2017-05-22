import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { getDeleteMessage } from '../../constants/lang';
import _ from 'underscore';

export class MetaTags extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
      pageTags: props.fieldValue || []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pageTags: nextProps.fieldValue });
  }

  componentDidUpdate() {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, this.state.pageTags);
  }

  createTag(e) {
    const { pageTags } = this.state;
    const clone = pageTags.slice();

    // create tags only if they do not exist already
    if (!clone.includes(e.target.value)) {
      clone.push(e.target.value);

      this.setState({
        pageTags: clone,
        tagInput: ''
      });
    }
  }

  deleteTag(index) {
    const { pageTags } = this.state;
    const clone = pageTags.slice();

    const tagName = (index == -1) ? clone.slice(-1).pop() : clone[index];
    const confirm = window.confirm(getDeleteMessage(`tag: ${tagName}`));

    if (confirm) {
      clone.splice(index, 1);
      this.setState({ pageTags: clone });
      this.refs.taginput.focus();
    }
  }

  handleKeyDown(e) {
    // define tags with either the 'comma' key or the 'Enter' key, or the 'Spacebar' key
    if ( e.target.value.length > 0 &&
      ( e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32 )) {
      this.createTag(e);
    } else if (e.target.value.length == 0 && e.keyCode === 8) {
      this.deleteTag(-1);
    }
  }

  render() {
    const { fieldValue } = this.props;
    const pageTags = this.state.pageTags.filter(
      function(tag, index, self) {
        return index == self.indexOf(tag);
      }
    );

    const tagPool = pageTags || fieldValue;

    const tags = _.map(tagPool, (tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span className="delete-tag" onClick={(e) => this.deleteTag(i)} />
        </span>
      );
    });

    return (
      <div className="field value-field tags-wrap" >
        <div className="tags-list">{tags}</div>
        <div className="tags-input">
          <input
            type="text"
            onChange={(e) => this.setState({ tagInput: e.target.value })}
            onKeyDown={(e) => this.handleKeyDown(e)}
            value = {this.state.tagInput.replace(/,|\s+/, '')}
            ref="taginput"/>
          <TextareaAutosize
            className="field value-field"
            value={this.state.pageTags.toString()}
            hidden />            
        </div>
      </div>
    );
  }
}

MetaTags.propTypes = {
  fieldValue: PropTypes.any,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired
};

export default MetaTags;
