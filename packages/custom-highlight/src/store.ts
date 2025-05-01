export interface DirectiveConfig {
	readonly store: CustomHighlightNameStore;
	/**
	 * Used to track whether the element is a the process of mounting or updating.
	 */
	cursor: number;
	deep: boolean;
	stop?: () => void;
}

// Needle stores keyed by the custom highlight name as received by the directive argument or the default custom highlight name.
export type CustomHighlightNameStore = Map<string, NeedleStore>;
export type NeedleStore = Map<NeedleId, NeedleInstance>;
export type NeedleId = string;

export interface NeedleInstance {
	readonly store: RangeStore;
	readonly regex: RegExp;
}

// Ranges keyed by the custom highlight name as received by the directive argument or regex capture name, or the default custom highlight name.
export type RangeStore = Map<string, Range[]>;
