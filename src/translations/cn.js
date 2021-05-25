// inline messages
export const getDeleteMessage = filename =>
  `确定要删除 "${filename}" 吗？`;

export const getLeaveMessage = () =>
  '修改未保存，确定要离开吗？';

export const getNotFoundMessage = type => `未发现 ${type} 类型。`;

export const getOverrideMessage = filename =>
  `确定要覆盖 ${filename} ？`;

// notification messages
export const getParserErrorMessage = () => '编译错误';

export const getSuccessMessage = () => '成功';

export const getErrorMessage = () => '错误';

export const getUploadSuccessMessage = filename =>
  `${filename} 上传成功`;

export const getUploadErrorMessage = () => `上传中出现问题。`;

export const getFetchErrorMessage = filename =>
  `无法取得 ${filename} 文件`;

export const getUpdateErrorMessage = filename =>
  `无法上传 ${filename}`;

export const getDeleteErrorMessage = filename =>
  `无法删除 ${filename}`;

export const getPublishDraftMessage = (draftPath, postPath) =>
  `草稿 '${draftPath}' 即将被转换为 '${postPath}'`;

// validation messages
export const getTitleRequiredMessage = () => '标题未填写';

export const getFilenameRequiredMessage = () => '文件名未填写';

export const getContentRequiredMessage = () => '内容为空';

export const getFilenameNotValidMessage = () => '文件名有误';

// sidebar titles
export const sidebar = {
  pages: '页面',
  posts: '文章',
  drafts: '草稿',
  datafiles: '数据文件',
  collections: '分类',
  staticfiles: '静态文件',
  configuration: '设置',
};

// button labels
export const labels = {
  save: {
    label: '保存',
    triggeredLabel: '已保存',
  },
  create: {
    label: '新建',
    triggeredLabel: '已新建',
  },
  delete: {
    label: '删除',
  },
  publish: {
    label: '发布',
  },
  view: {
    label: '查看',
  },
  upload: {
    label: '上传',
  },
  viewToggle: {
    label: '切换为GUI编辑器',
    triggeredLabel: '切换为Raw编辑器',
  },
};
