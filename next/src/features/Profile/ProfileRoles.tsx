import { FC } from 'react';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '@/shared/store/hooks';
import useT from '@/shared/hooks/useT';

const ProfileRoles: FC = () => {
  const t = useT();
  const profile = useAppSelector((store) => store.main.profile);

  return (
    <Typography variant="body1" sx={{ my: 1 }}>
      {profile?.roles?.map((role) => role.name).join(', ') || t.empty}
    </Typography>
  );
};
export default ProfileRoles;
