import yaml from 'js-yaml';
import _ from 'underscore';

export function toYAML(obj) {
  return (!_.isEmpty(obj)) ? yaml.safeDump(obj, {indent:2}) : "";
}

export function toJSON(yamlString) {
  return (yamlString ? yaml.load(yamlString) : {});
}
