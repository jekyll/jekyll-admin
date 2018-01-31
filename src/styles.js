import styled from 'styled-components';
import { Alert } from 'antd';

export const ContentBody = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 360px;
`;

export const StyledAlert = styled(Alert)`
  margin-top: 16px;
`;

export const RightSpan = styled.span`
  float: right;
`;

export const Label = styled.strong`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 4px;
`;
