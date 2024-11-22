<template>
  <v-app>
    <!-- Topbar -->
    <v-toolbar color="primary">
      <v-toolbar-title>
        <v-row align="center" no-gutters>
          <img :src="require('@/assets/dtu.png')" class="mr-3" alt="DTU" height="40" />
          <v-app-bar-title>pyBeamline Designer</v-app-bar-title>
        </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-toolbar>

    <!-- Toolbar -->
    <v-tabs v-model="tab" class="mb-3">
      <v-tab :value="intro">
        <v-icon icon="mdi-home" />
        Intro
      </v-tab>
      <v-tab :value="dataflow">
        <v-icon icon="mdi-view-dashboard-outline" />
        Data flow design
      </v-tab>
      <v-tab :value="python">
        <v-icon icon="mdi-language-python" />
        Generated pyBeamline
      </v-tab>
      <v-tab :value="exec">
        <v-icon icon="mdi-play-speed" />
        Code execution
      </v-tab>
    </v-tabs>


    <!-- Main Content -->
    <v-main class="d-flex flex-fill">
      <v-tabs-window v-model="tab" class="flex-fill" style="height: 100%;">
        <v-tabs-window-item value="intro" class="flex-fill">
          <v-container>
            <h1 class="mb-3">pyBeamline Designer</h1>
            <p>This is the pyBeamline Designer, a tool that allows you to quickly create pyBeamline code.</p>
            <p>Start by selecting the Data Flow Design tab.</p>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="dataflow" class="flex-fill">
          <v-container>
            <p>Here something like vue-flow should be used, see:</p>
            <ul>
              <li>https://vueflow.dev/</li>
              <li>https://vueflow.dev/examples/dnd.html</li>
              <li>https://dev.to/monsterpi13/vue-flow-quickstart-and-best-practices-482k
                <ul>
                  <li>https://www.monsterpi13.dev/writing/vue-flow-quickstart-and-best-practices</li>
                  <li>https://chat-bot-workflow.vercel.app/</li>
                </ul>
              </li>
            </ul>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="python" class="flex-fill">
          <v-container class="flex-fill" style="height: 100%;">
            <div class="border-thin flex-fill" style="height: 100%;">
              <codemirror v-model="code" style="height: 100%;" />
            </div>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="exec" class="flex-fill">
          <v-container class="flex-fill" style="height: 100%;">
            <h1 class="mb-3">Code Execution</h1>
            <CodeExecutor />
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script>
import CodeExecutor from './components/CodeExecutor.vue';

export default {
  components: {
    CodeExecutor
  },
  data: () => ({
      tab: null,
      code: `import reactivex
from reactivex import operators as ops

log_with_drift.pipe(
  ops.buffer_with_count(40),
  ops.flat_map(lambda events: reactivex.from_iterable(events).pipe(
      ops.pairwise(),
      ops.filter(lambda x: x[0].get_trace_name() == x[1].get_trace_name() and x[0].get_event_name() == "B" and x[1].get_event_name() == "C"),
      ops.count()
      )
  )
).subscribe(lambda x: print(x))
`
    })
};
</script>
