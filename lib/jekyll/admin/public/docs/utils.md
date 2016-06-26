# Utility functions
Contains utility functions.

## toYAML
Converts the object into YAML string.

``` javascript
/**
 * @param {Object} object
 * @return {String} yaml
 */
toYAML(object)
```

## toJSON
Converts the YAML string into JS object.

``` javascript
/**
 * @param {String} string
 * @return {Object} obj
 */
toJSON(string)
```

## capitalize
Capitalize the given string.

``` javascript
/**
 * @param {String} string
 * @return {String} string
 */
capitalize(string)
```

# Metadata helper functions

## addField
Returns the metadata of the state with the new empty field. If the field does not exist, returns the original metadata. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} namePrefix
 * @return {Object} metadata
 */
addField(state, namePrefix)
```

## removeField
Returns the metadata of the state with the removed key. If the field does not
exist, returns the original metadata. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} key
 * @return {Object} metadata
 */
removeField(state, namePrefix, key)
```

## updateFieldKey
Returns the metadata of the state with the updated key. If the field does not
exist or the key already exists, returns the original metadata. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} fieldKey
 * @param {String} newKey
 * @return {Object} metadata
 */
updateFieldKey(state, namePrefix, fieldKey, newKey)
```

## updateFieldValue
Returns the metadata of the state with the updated value of given path(nameAttr).
If the field does not exist, creates a new field. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} value
 * @return {Object} metadata
 */
updateFieldValue(state, nameAttr, value)
```

## convertField
Returns the metadata of the state with the converted type of given path(nameAttr).
If the field does not exist, returns the original metadata. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} convertType
 * @return {Object} metadata
 */
convertField(state, nameAttr, convertType)
```

## moveArrayItem
Returns the metadata of the state with the sorted array. Moves the array item to
target index, shifts the rest of them. If the given path is not an array,
returns the original metadata. Does not mutate the given state.

``` javascript
/**
 * @param {Object} state
 * @param {String} namePrefix
 * @param {Number} srcInd
 * @param {Number} targetInd
 * @return {Object} metadata
 */
moveArrayItem(state, namePrefix, srcInd, targetInd)
```

# Form helper functions

## validateForm
Returns error messages if the given values does not pass the provided
validators.

``` javascript
/**
 * @param {Array} values
 * @param {Object} validators
 * @param {Object} errors
 * @return {Array} errorMessages
 */
validateForm(values, validators, errors)
```
