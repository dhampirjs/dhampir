enum PROFILE {
    CRAB = "crab",
    EAGLE = "eagle",
    ORION = "orion",
    HELIX = "helix",
    RING = "ring",
    TRIFID = "trifid",
    LAGOON = "lagoon",
};

const PROFILES: PROFILE[] = [
    PROFILE.CRAB,
    PROFILE.EAGLE,
    PROFILE.ORION,
    PROFILE.HELIX,
    PROFILE.RING,
    PROFILE.TRIFID,
    PROFILE.LAGOON,
];

const DEFAULT_PROFILE = PROFILE.CRAB;

export {
    PROFILE,
    PROFILES,
    DEFAULT_PROFILE,
}
