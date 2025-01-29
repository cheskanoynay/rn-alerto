import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import _ from "lodash";
import { LucidePaperclip, LucideSend } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";

import { UserLayout } from "~/components/layout/user-layout";
import {
  createMessage,
  getMessagesByRealtime,
  getUsersByRealtime,
} from "~/lib/firebase/firestore";
import { tw } from "~/lib/tailwind";
import { UserStackScreenProps } from "~/navigations/user-stack";
import { MessageSchema } from "~/schema/message";
import { UserSchema } from "~/schema/user";
import { useAppSelector } from "~/store";
import { getError } from "~/utils/error";

const MessagesScreen = () => {
  const [messages, setMessages] = useState<MessageSchema[]>([]);
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userData } = useAppSelector((state) => state.user);

  const { params } = useRoute<UserStackScreenProps<"Messages">["route"]>();
  const { id } = params;

  const parsedMessages = _.sortBy(
    messages
      .map((m) => {
        const mUser = users.find((u) => u.id === m.senderId) ?? null;

        if (!userData || !mUser) return null;

        return {
          _id: m.id,
          createdAt: m.dateCreated,
          text: m.text,
          audio: m.audio,
          video: m.video,
          image: m.image,
          user: {
            _id: mUser?.id || "unknown",
            name: mUser?.name || "Unknown",
            avatar: mUser?.profile || "https://avatar.iran.liara.run/public",
          },
        } satisfies IMessage;
      })
      .filter((m) => !!m),
    (m) => m.createdAt,
  ).reverse();

  const handleSendMessage = async (m: IMessage[]) => {
    if (loading) return;

    if (!userData) return Alert.alert("Failed", "No user data found.");

    setLoading(true);

    try {
      await createMessage({
        senderId: userData.id,
        reportId: id,
        senderType: "user",
        audio: "",
        image: "",
        text: m[0].text,
        video: "",
      });
    } catch (error) {
      const err = getError(error, "Failed sending message.");

      Alert.alert("Failed", err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = getMessagesByRealtime({ reportId: id })(setMessages);

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const userIds = messages.map((m) => m.senderId);

    if (userIds.length > 0) {
      const unsubscribe = getUsersByRealtime({ ids: userIds })(setUsers);

      return unsubscribe;
    }
  }, [messages]);

  return (
    <UserLayout style={tw`flex-1`}>
      <GiftedChat
        messages={parsedMessages}
        onSend={handleSendMessage}
        user={{
          _id: userData?.id || "me",
        }}
        alwaysShowSend
        renderSend={(sendProps) => (
          <View style={tw`flex-row items-center gap-2 px-4`}>
            <TouchableOpacity>
              <LucidePaperclip style={tw`text-black`} size={20} />
            </TouchableOpacity>

            <Send
              {...sendProps}
              containerStyle={tw`items-center justify-center`}
            >
              <LucideSend style={tw`text-blue-600`} size={20} />
            </Send>
          </View>
        )}
      />
    </UserLayout>
  );
};

export { MessagesScreen };
