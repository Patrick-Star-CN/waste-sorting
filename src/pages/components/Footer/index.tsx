import { Space, Button } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';

export default function Footer() {
  return (
    <Space>
      <Button
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
      <span>Copyright</span>
    </Space>
  );
}
