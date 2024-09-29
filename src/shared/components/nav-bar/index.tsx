'use client';

import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { paths } from '../../../routes/paths';
import IntroPage from '../intro-page';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  console.log('pathname', pathname);
  const handleChange = useMemo(
    () => (path: string) => {
      router.push(path);
    },
    [router]
  );

  const currentPage = useMemo(() => {
    const currentLink = LINKS.find((link) => `${link.path}/` === pathname);
    return currentLink ? currentLink.label : '';
  }, [pathname]);

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#EBEFF8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          zIndex: 99,
        }}
      >
        {LINKS.map((tab) => (
          <>
            <List key={tab.value}>
              <ListItemButton>
                <ListItemText primary={tab.label} onClick={() => handleChange(tab.path)} />
              </ListItemButton>
            </List>
          </>
        ))}
      </Box>
      <IntroPage title={currentPage || '---'} />
    </>
  );
}

const LINKS = [
  {
    value: 'shop',
    label: 'Sản phẩm',
    path: paths.dashboard.root,
  },
  {
    value: 'flash-sale',
    label: 'Flash sale',
    path: '#',
  },
  {
    value: 'payment_instructions',
    label: 'Hướng dẫn thanh toán',
    path: paths.dashboard.payment.root,
  },
  {
    value: 'history',
    label: 'Lịch sử mua hàng',
    path: '#',
  },
  {
    value: 'sell',
    label: 'Đăng bán sản phẩm',
    path: '#',
  },
];
