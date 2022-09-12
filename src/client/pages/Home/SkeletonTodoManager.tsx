import {
  CardHeader,
  css,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
  Toolbar,
} from "@mui/material";
import tw from "twin.macro";
import hasTouchScreen from "../../utils/hasTouchScreen";

const SkeletonTodoManager = () => {
  return (
    <>
      <CardHeader
        avatar={
          <div tw="mx-[11px] py-[7px]">
            <Skeleton width={20} height={34} animation="wave" />
          </div>
        }
      />
      <Divider />
      <List>
        {Array.from({ length: 3 }).map((_, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <div tw="mx-[11px]">
                <Skeleton width={20} height={34} animation="wave" />
              </div>
            </ListItemIcon>
            <ListItemText>
              <Skeleton
                height={34}
                width={80 + 20 * (((index + 1) % 2) * ((index + 1) % 5))}
                animation="wave"
              />
            </ListItemText>
            <ListItemSecondaryAction>
              {hasTouchScreen && (
                <div tw="mx-[14px]">
                  <Skeleton width={20} height={34} animation="wave" />
                </div>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Toolbar
        tw="flex justify-between flex-wrap"
        style={{ padding: "8px 16px 10px" }}
      >
        <Skeleton width={90} height={34} animation="wave" />
        <div
          css={[
            tw`inline-flex order-first justify-center pt-1 pb-4 -mx-6 mb-2 sm:flex-initial sm:order-none sm:border-none sm:m-auto sm:p-0`,
            css`
              flex: 1 0 100%;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            `,
          ]}
        >
          <Skeleton width={210} height={34} animation="wave" />
        </div>
        <Skeleton width={140} height={34} animation="wave" />
      </Toolbar>
    </>
  );
};

export default SkeletonTodoManager;
