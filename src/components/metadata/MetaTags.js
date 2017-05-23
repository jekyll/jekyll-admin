import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { getDeleteMessage } from '../../constants/lang';
import _ from 'underscore';

export class MetaTags extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
      pageTags: props.fieldValue || [],
      autoSuggest: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pageTags: nextProps.fieldValue });
  }

  componentDidUpdate() {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, this.state.pageTags);
  }

  createTag(value) {
    const { pageTags } = this.state;
    const clone = pageTags.slice();

    // create tags only if they do not exist already
    if (!clone.includes(value)) {
      clone.push(value);

      this.setState({
        pageTags: clone,
        tagInput: '',
        autoSuggest: false
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

  handleChange(e) {
    if (e.target.value.length > 1) {
      this.setState({ autoSuggest: true });
    } else {
      this.setState({ autoSuggest: false });
    }
    this.setState({ tagInput: e.target.value });
  }

  handleKeyDown(e) {
    // define tags with either the 'comma' key or the 'Enter' key, or the 'Spacebar' key
    if (e.target.value.length > 0 &&
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32)) {
      this.createTag(e.target.value);
    } else if (e.target.value.length == 0 && e.keyCode === 8) {
      this.deleteTag(-1);
    }
  }

  render() {
    const { pageTags } = this.state;
    const suggestions = this.props.suggestions || [];

    if (pageTags.length > 0 && !(pageTags instanceof(Array))) {
      return (
        <span className="meta-error">
          Invalid array of tags! Found string: <b>"{pageTags}"</b>
        </span>
      );
    }

    const tagPool = pageTags.filter(
      function(tag, index, self) {
        return index == self.indexOf(tag);
      }
    );

    const tags = _.map(tagPool, (tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span className="delete-tag" onClick={(e) => this.deleteTag(i)} />
        </span>
      );
    });

    const suggests = _.map(suggestions, (item, i) => {
      if (!pageTags.includes(item)) {
        return (
          <li key={i} onClick={(e) => this.createTag(item)}>
            {item}
          </li>
        );
      }
    });

    return (
      <div className="tags-wrap">
        <div className="field value-field">
          <div className="tags-list">{tags}</div>
          <div className="tags-input">
            <input
              type="text"
              onChange={(e) => this.handleChange(e)}
              onKeyDown={(e) => this.handleKeyDown(e)}
              value = {this.state.tagInput.replace(/,|\s+/, '')}
              ref="taginput"/>
            <TextareaAutosize
              className="field value-field"
              value={this.state.pageTags.toString()}
              hidden />
          </div>
        </div>
          {
            this.state.autoSuggest && suggestions.length > 0 &&
              <div className="field tag-suggestions">
                <ul>{suggests}</ul>
              </div>
          }
      </div>
    );
  }
}

MetaTags.propTypes = {
  fieldValue: PropTypes.any,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired,
  suggestions: PropTypes.array
};

export default MetaTags;
