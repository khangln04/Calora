import "@/global.css";
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

function AuthGate() {
  const { colors, brand } = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const { session, isLoading, setSession, setLoading } = useSessionStore();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if user has completed body metrics
  useEffect(() => {
    if (!session?.user) {
      setHasProfile(null);
      return;
    }

    supabase
      .from("users")
      .select("weight_kg")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        setHasProfile(!!data?.weight_kg);
      });
  }, [session?.user?.id]);

  useEffect(() => {
    if (isLoading) return;

    const inAuth = segments[0] === "(auth)";
    const inBodyMetrics = segments[1] === "body-metrics";

    if (!session && !inAuth) {
      // Not logged in → go to auth
      router.replace("/(auth)");
    } else if (session && inAuth && !inBodyMetrics) {
      // Logged in, not on body-metrics → check profile
      if (hasProfile === false) {
        // Profile incomplete → go to body-metrics
        router.replace("/(auth)/body-metrics");
      } else if (hasProfile === true) {
        // Profile complete → go to main
        router.replace("/(main)");
      }
      // hasProfile === null → still checking, do nothing
    } else if (session && inBodyMetrics) {
      // On body-metrics with session → allow (don't redirect)
    } else if (session && !inAuth && hasProfile === false) {
      // Somehow in main without profile → go to body-metrics
      router.replace("/(auth)/body-metrics");
    }
  }, [session, isLoading, segments, hasProfile]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={brand.orange} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthGate />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
