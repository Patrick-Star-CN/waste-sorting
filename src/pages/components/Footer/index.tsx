import { Space, Button } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';

export default function Footer(props: any) {
  return (
    <Space block justify="center">
      <Button
        color="danger"
        size="small"
        onClick={() => {
          localStorage.removeItem('WASTESORTING_RECORD');
          localStorage.removeItem('WASTESORTING_USERNAME');
          window.location.reload();
        }}
      >
        <DeleteOutline />
        清除缓存
      </Button>
      <Button
        color="primary"
        size="small"
        onClick={() => {
          props.togglePromptVisible(true);
        }}
      >
        指引
      </Button>
    </Space>
  );
}
