import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import _ from 'underscore';
import classnames from 'classnames';
import { getDeleteMessage } from '../../constants/lang';

export class MetaTags extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
      pageTags: props.fieldValue || [''],
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

    const tagName = (index === -1) ? clone.slice(-1).pop() : clone[index];
    const confirm = window.confirm(getDeleteMessage(`tag: ${tagName}`));

    if (confirm) {
      clone.splice(index, 1);
      this.setState({ pageTags: clone });
      this.refs.taginput.focus();
    }
  }

  handleKeyDown(e) {
    const { pageTags } = this.state;
    const input = e.target.value;

    // define tags with either the 'comma' key or the 'Enter' key, or the 'Spacebar' key
    if (input.length > 0 &&
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32)) {
      this.createTag(input);
    } else if (pageTags.length > 0 && input.length === 0 && e.keyCode === 8) {
      this.deleteTag(-1);
    }
  }

  rectifyTags(str) {
    const rectified = str.split(' ');
    this.setState({ pageTags: rectified });
  }

  render() {
    const { pageTags } = this.state;

    let suggestions = this.props.suggestions || [];
    suggestions = _.filter(suggestions, entry => {
      return entry.startsWith(this.state.tagInput);
    });

    if (pageTags.length > 0 && !(pageTags instanceof(Array))) {
      return (
        <span className="meta-error">
          Invalid array of tags! Found string: <b>"{pageTags}"</b><br/>
          Click
            <span onClick={() => this.rectifyTags(pageTags)}> here </span>
          to correct.
        </span>
      );
    }

    const tagPool = pageTags.filter(Boolean); // fiter out nil or empty elements

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
    }).filter(Boolean);

    const suggestionClasses = classnames({
      'field': true,
      'tag-suggestions': true,
      'visible': this.state.autoSuggest
    });

    return (
      <div className="tags-wrap">
        <div className="field value-field">
          {
            tags.length > 0 &&
            <div className="tags-list">{tags}</div>
          }

          <div className="tags-input">
            <input
              type="text"
              onFocus={() => this.setState({ autoSuggest: true })}
              onBlur={() => this.setState({ autoSuggest: false })}
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
          {
            suggests.length > 0 &&
              <div className={suggestionClasses}>
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
