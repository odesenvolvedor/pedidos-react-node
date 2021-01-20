import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import { CustomLink } from '..';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <CustomLink to="/">
        <ListItemText primary="Início" />
      </CustomLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <CustomLink to="/clientes">
        <ListItemText primary="Clientes" />
      </CustomLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <CustomLink to="/produtos">
        <ListItemText primary="Produtos" />
      </CustomLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <CustomLink to="/pedidos">
        <ListItemText primary="Pedidos" />
      </CustomLink>
    </ListItem>
  </div>
);
