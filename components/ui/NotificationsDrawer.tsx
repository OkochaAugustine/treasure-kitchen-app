"use client";

import {
  Box,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type Notification = {
  id: string;
  message: string;
  created_at?: string;
};

export default function NotificationsDrawer({
  isOpen,
  closeAction,
  notifications = [],
  markAllReadAction,
}: {
  isOpen: boolean;
  closeAction: () => void;
  notifications: Notification[];
  markAllReadAction: () => Promise<void> | void;
}) {
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={closeAction} size="sm">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="lg" fontWeight="bold">Notifications</Text>

          <IconButton
            aria-label="Close notifications"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={closeAction}
          />
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            <Button
              size="sm"
              colorScheme="green"
              onClick={markAllReadAction}
            >
              Mark all as read
            </Button>

            {notifications.length === 0 ? (
              <Box p={3} bg="gray.50" borderRadius="md">
                <Text color="gray.500">No new notifications</Text>
              </Box>
            ) : (
              notifications.map((n) => (
                <Box
                  key={n.id}
                  p={3}
                  bg="gray.100"
                  borderRadius="md"
                  shadow="sm"
                >
                  <Text fontSize="sm">{n.message}</Text>

                  {n.created_at && (
                    <Text fontSize="xs" color="gray.500" mt={2}>
                      {new Date(n.created_at).toLocaleString()}
                    </Text>
                  )}
                </Box>
              ))
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="ghost" onClick={closeAction}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
