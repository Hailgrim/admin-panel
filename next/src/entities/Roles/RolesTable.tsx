import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { FC, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

import useT from '@/shared/hooks/useT';
import useRights from '@/shared/hooks/useRights';
import { ROUTES } from '@/shared/lib/constants';
import { IRole } from '@/shared/api/roles/types';

const RolesTable: FC<Omit<DataGridProps<IRole>, 'columns'>> = (props) => {
  const t = useT();
  const rights = useRights(ROUTES.api.roles);

  const сolumns: GridColDef<IRole>[] = useMemo(
    () => [
      {
        field: 'edit',
        headerName: t.edit,
        width: 50,
        type: 'boolean',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <IconButton
            {...(rights.reading && {
              href: ROUTES.ui.role(params.row.id),
            })}
            LinkComponent={Link}
            disabled={!rights.reading || params.row.default || params.row.admin}
          >
            <EditIcon />
          </IconButton>
        ),
      },
      { field: 'id', headerName: t.id, minWidth: 150, type: 'number' },
      {
        field: 'name',
        headerName: t.name,
        minWidth: 250,
        type: 'string',
        flex: 1,
      },
      {
        field: 'description',
        headerName: t.description,
        minWidth: 250,
        type: 'string',
        flex: 1,
      },
      { field: 'enabled', headerName: t.enabled, width: 150, type: 'boolean' },
    ],
    [t, rights]
  );

  return (
    <DataGrid<IRole>
      {...props}
      sx={{ width: '100%', minHeight: 200, my: 1 }}
      pageSizeOptions={[25, 50, 100]}
      columns={сolumns}
      isRowSelectable={(params) =>
        rights.deleting && !params.row.admin && !params.row.default
      }
      paginationMode="server"
      checkboxSelection
    />
  );
};
export default RolesTable;
