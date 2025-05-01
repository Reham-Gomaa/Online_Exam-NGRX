export type examState = 'not started' | 'started' | 'score' | 'results' | 'closed'

export interface ExamStates {
    state:examState,
    isExamOpen:boolean
}
