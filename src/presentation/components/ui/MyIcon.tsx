import {Icon} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  width?: number;
  height?: number;
}

export const MyIcon = ({name, color = 'black', white = false, width = 30, height = 30}: Props) => {
  return <Icon style={{width, height}} fill={ color } name={ name } />;
};

