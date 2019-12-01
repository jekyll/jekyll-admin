import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classnames from 'classnames';
import { getDeleteMessage } from '../../translations';

export default class MetaTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
      pageTags: props.fieldValue || [],
      autoSuggest: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fieldValue } = nextProps;
    this.setState({ pageTags: fieldValue || [] });
  }

  componentDidUpdate() {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, this.state.pageTags);
  }

  createTag(value) {
    const { pageTags } = this.state;
    const clone = [...pageTags];

    // create tags only if they do not exist already
    if (!clone.includes(value)) {
      clone.push(value);

      this.setState({
        pageTags: clone,
        tagInput: '',
        autoSuggest: false,
      });
    }
  }

  deleteTag(index) {
    const { pageTags } = this.state;
    const clone = [...pageTags];

    const tagName = index === -1 ? clone.slice(-1).pop() : clone[index];
    const confirm = window.confirm(getDeleteMessage(`tag: ${tagName}`));

    if (confirm) {
      clone.splice(index, 1);
      this.setState({ pageTags: clone });
      this.refs.taginput.focus();
    }
  }

  // keys that when pressed and released creates a new tag from the input value.
  creators = [',', ' ', 'Enter'];

  handleKeyUp(e) {
    const { pageTags } = this.state;
    const input = e.target.value;

    if (input.length && this.creators.includes(e.key)) {
      this.createTag(input);
    } else if (pageTags.length && input.length === 0 && e.key === 'Backspace') {
      this.deleteTag(-1);
    }
  }

  render() {
    const { pageTags } = this.state;
    const tagInput = `${this.state.tagInput}`;

    let suggestions = this.props.suggestions;
    suggestions = suggestions.filter(entry => {
      return entry.startsWith(tagInput);
    });

    if (pageTags.length && !(pageTags instanceof Array)) {
      const value = `${pageTags}`;
      const rectified = value.split(' ');
      return (
        <span className="meta-error">
          Invalid array of tags! Found: <strong>{value}</strong>
          <br />
          <span onClick={() => this.setState({ pageTags: rectified })}>
            Click here
          </span>
          to correct.
        </span>
      );
    }

    const tagPool = pageTags.filter(Boolean); // fiter out nil or empty elements

    const tags = tagPool.map((tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span className="delete-tag" onClick={() => this.deleteTag(i)} />
        </span>
      );
    });

    const suggests = suggestions.map((item, i) => {
      if (!pageTags.includes(item)) {
        return (
          <li key={i} onClick={() => this.createTag(item)}>
            {item}
          </li>
        );
      }
    }).filter(Boolean);

    const suggestionClasses = classnames('field', 'tag-suggestions', {
      visible: this.state.autoSuggest,
    });

    return (
      <div className="tags-wrap field value-field">
        {tags.length > 0 && <div className="tags-list">{tags}</div>}

        <div className="tags-input">
          <input
            type="text"
            onChange={e => this.setState({ tagInput: e.target.value })}
            onFocus={() => this.setState({ autoSuggest: true })}
            onBlur={() => this.setState({ autoSuggest: false })}
            onKeyUp={e => this.handleKeyUp(e)}
            value={tagInput.replace(/,|\s+/, '')}
            ref="taginput"
          />

          <TextareaAutosize
            className="field value-field"
            value={this.state.pageTags.toString()}
            hidden
          />
        </div>
        {suggests.length > 0 && (
          <div className={suggestionClasses}>
            <ul>{suggests}</ul>
          </div>
        )}
      </div>
    );
  }
}

MetaTags.defaultProps = {
  fieldValue: [],
  suggestions: [],
};

MetaTags.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired,
  suggestions: PropTypes.array,
  fieldValue: PropTypes.any,
};
