import { mount, RouterLinkStub } from "@vue/test-utils";

import ElectionHighlight from "@/components/electionSearch/ElectionHighlight.vue";

describe("ElectionHighlight", () => {
  const createElectionProps = (electionProps = {}) => ({
    title: "Test Election",
    location: "6127a19fe6529225c42414fd",
    ...electionProps,
  });

  const createConfig = (electionProps) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      election: {
        ...electionProps,
      },
    },
  });
  it("renders election title", () => {
    const electionProps = createElectionProps({ title: "New Test" });
    const wrapper = mount(ElectionHighlight, createConfig(electionProps));
    expect(wrapper.text()).toMatch("New Test");
  });
  it("renders election topic", () => {
    const testTopic = "Which candidate would you like to lead us?";
    const electionProps = createElectionProps({ topic: testTopic });
    const wrapper = mount(ElectionHighlight, createConfig(electionProps));
    expect(wrapper.text()).toMatch(testTopic);
  });
  it("renders a ballot count", () => {
    const testBallots = [[1, 2], [5, 2, 1], [7]]; //length is 3
    const electionProps = createElectionProps({ ballots: testBallots });
    const wrapper = mount(ElectionHighlight, createConfig(electionProps));
    const ballotCounter = wrapper.find("[data-test='ballot-count']");
    expect(ballotCounter.text()).toMatch("3");
  });
  it("links to individual elections", () => {
    const electionProps = createElectionProps({
      id: "coollection",
    });
    const wrapper = mount(ElectionHighlight, createConfig(electionProps));
    const electionLink = wrapper.findComponent(RouterLinkStub);
    const toProp = electionLink.props("to");
    expect(toProp).toBe("/elections/coollection");
  });
});
