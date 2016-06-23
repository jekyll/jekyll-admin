# Utility functions
Contains utility functions

## toYAML
Converts the object into YAML string.

``` javascript
toYAML(object)
```

## toJSON
Converts the YAML string into JS object.

``` javascript
toYAML(string)
```

## capitalize
Capitalize the given string

``` javascript
capitalize(string)
```

# Metadata helper functions

## addField
Returns the metadata of the state with the new empty field. If the field does not exist, returns the original metadata. Does not mutate the given state.

``` javascript
addField(state, namePrefix)
```

## removeField
Returns the metadata of the state with the removed key. If the field does not
exist, returns the original metadata. Does not mutate the given state.

``` javascript
removeField(state, namePrefix, key)
```

## updateFieldKey
Returns the metadata of the state with the updated key. If the field does not
exist or the key already exists, returns the original metadata. Does not mutate the given state.

``` javascript
updateFieldKey(state, namePrefix, fieldKey, newKey)
```

## updateFieldValue
Returns the metadata of the state with the updated value of given path(nameAttr).
If the field does not exist, creates a new field. Does not mutate the given state.

``` javascript
updateFieldValue(state, nameAttr, value)
```

## convertField
Returns the metadata of the state with the converted type of given path(nameAttr).
If the field does not exist, returns the original metadata. Does not mutate the given state.

``` javascript
convertField(state, nameAttr, convertType)
```

## moveArrayItem
Returns the metadata of the state with the sorted array. Moves the array item to
target index, shifts the rest of them. If the given path is not an array,
returns the original metadata. Does not mutate the given state.

``` javascript
moveArrayItem(state, namePrefix, srcInd, targetInd)
```
